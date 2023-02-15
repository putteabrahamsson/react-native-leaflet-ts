import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { GeoJson, Layers, Markers, Zoom } from '../types/types';

type Props = {
  mapLayers: Layers[];
  geoJson?: GeoJson;
  zoom?: Zoom;
  minZoom?: Zoom;
  maxZoom?: Zoom;
  markers?: Markers[];
  flyTo?: {
    latLng: number[];
    zoom: Zoom;
  };
  onMessage?: (event: any) => void;
  onError?: (event: any) => void;
  onLoadStart?: () => void;
  startInLoadingState?: boolean;
  backgroundColor?: string;
  injectJavascript?: string;
};

export const RNLeaflet: FC<Props> = ({
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
}) => {
  const htmlFile =
    Platform.OS === 'android'
      ? { uri: 'file:///android_asset/Leaflet.html' }
      : require('../html/Leaflet.html');

  const ref = useRef<WebView>(null);
  const [configured, setConfigured] = useState(false);

  const sendAction = useCallback((message: any) => {
    if (!ref?.current) return;

    ref.current.postMessage(`${JSON.stringify(message)}`);
  }, []);

  const injectScript = useCallback((script: string) => {
    ref.current?.injectJavaScript(script);
  }, []);

  useLayoutEffect(() => {
    if (!configured) return;

    if (!flyTo) {
      sendAction({ zoom });
    }
    if (maxZoom) sendAction({ maxZoom });
    if (minZoom) sendAction({ minZoom });
    if (markers) sendAction({ markers });
    if (geoJson) sendAction({ geoJson });
    if (flyTo) {
      sendAction({
        flyTo: {
          latLng: flyTo?.latLng,
          zoom: flyTo?.zoom,
        },
      });
    }
    if (mapLayers) sendAction({ mapLayers });
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
    if (!configured) return;
    if (injectJavascript) injectScript(injectJavascript);
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
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  flexer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
