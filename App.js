import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// 상수 정의
// 하단 제스처/내비게이션 바 높이 설정
// (iOS 노치 34px, Android 제스처/버튼 바를 가리지 않도록 50px로 충분히 확보)
const BOTTOM_SAFE_AREA_HEIGHT = Platform.OS === 'ios' ? 34 : 50;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        // translucent={false}를 사용하여 상단 상태바 영역을 OS가 처리하도록 합니다.
        translucent={false}
      />

      {/* WebView가 컨테이너 전체 공간을 차지하며, 컨테이너의 paddingTop/paddingBottom 덕분에
          상하단 안전 영역을 침범하지 않습니다. */}
      <WebView
        source={{ uri: 'https://wavedream.kr' }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ★★★ 상단 안전 영역 확보: 모든 콘텐츠를 Status Bar 높이만큼 아래로 밀어냅니다. ★★★
    // Android에서 translucent=false일 때 이 값이 필요합니다.
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // ★★★ 하단 안전 영역 확보: 웹뷰 콘텐츠를 제스처 바 높이만큼 위로 올립니다. ★★★
    paddingBottom: BOTTOM_SAFE_AREA_HEIGHT,
  },
  webview: {
    flex: 1, // 남은 공간을 모두 차지
  },
});