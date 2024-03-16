/* eslint-disable react/display-name */
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { GeoJson, Layers, Markers, Zoom } from '../types/types';

type TFlyTo = {
  latLng: number[];
  zoom: Zoom;
};

type Props = {
  mapLayers: Layers[];
  geoJson?: GeoJson;
  zoom?: Zoom;
  minZoom?: Zoom;
  maxZoom?: Zoom;
  markers?: Markers[];
  flyTo?: TFlyTo;
  onMessage?: (event: any) => void;
  onError?: (event: any) => void;
  onLoadStart?: () => void;
  startInLoadingState?: boolean;
  backgroundColor?: string;
  injectJavascript?: string;
};

export type RNLeafletRef = {
  flyTo: (props: TFlyTo) => void;
  clearMarkers: () => void;
};

export const RNLeaflet = forwardRef<RNLeafletRef, Props>(
  (
    {
      mapLayers,
      geoJson,
      zoom = 0,
      minZoom,
      maxZoom,
      markers,
      flyTo,
      onMessage,
      onError,
      onLoadStart,
      startInLoadingState = true,
      backgroundColor,
      injectJavascript,
    },
    // eslint-disable-next-line prettier/prettier
    passRef,
  ) => {
    const htmlFile =
      Platform.OS === 'android'
        ? { uri: 'file:///android_asset/Leaflet.html' }
        : require('../html/Leaflet.html');

    const ref = useRef<WebView>(null);
    const [configured, setConfigured] = useState(false);

    useImperativeHandle(passRef, () => ({
      flyTo({ latLng, zoom: flyToZoom }) {
        sendAction({
          flyTo: {
            latLng: latLng,
            zoom: flyToZoom,
          },
        });
      },
      clearMarkers: () => {
        sendAction({
          clearMarkers: true,
        });
      },
    }));

    const sendAction = useCallback((message: any) => {
      if (!ref?.current) {
        return;
      }

      ref.current.postMessage(`${JSON.stringify(message)}`);
    }, []);

    const injectScript = useCallback((script: string) => {
      ref.current?.injectJavaScript(script);
    }, []);

    useLayoutEffect(() => {
      if (!configured) {
        return;
      }

      if (!flyTo) {
        sendAction({ zoom });
      }
      if (maxZoom) {
        sendAction({ maxZoom });
      }
      if (minZoom) {
        sendAction({ minZoom });
      }
      if (markers) {
        sendAction({ markers });
      }
      if (geoJson) {
        sendAction({ geoJson });
      }
      if (flyTo) {
        sendAction({
          flyTo: {
            latLng: flyTo?.latLng,
            zoom: flyTo?.zoom,
          },
        });
      }
      if (mapLayers) {
        sendAction({ mapLayers });
      }
    }, [
      flyTo,
      flyTo?.latLng,
      flyTo?.zoom,
      markers,
      maxZoom,
      sendAction,
      mapLayers,
      zoom,
      configured,
      minZoom,
      geoJson,
    ]);

    useLayoutEffect(() => {
      if (!configured) {
        return;
      }
      if (injectJavascript) {
        injectScript(injectJavascript);
      }
    }, [configured, injectJavascript, injectScript]);

    return (
      <View style={[styles.wrapper, { backgroundColor }]}>
        <WebView
          ref={ref}
          source={htmlFile}
          style={styles.flexer}
          containerStyle={styles.flexer}
          onMessage={(e: any) => onMessage && onMessage(e?.nativeEvent?.data)}
          onError={onError}
          onLoadStart={onLoadStart}
          onLoadEnd={() => setConfigured(true)}
          startInLoadingState={startInLoadingState}
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  flexer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
