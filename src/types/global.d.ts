declare global {
  interface Window {
    TradingView: {
      widget: new (config: {
        symbol?: string;
        interval?: string;
        timezone?: string;
        theme?: string;
        style?: string;
        locale?: string;
        toolbar_bg?: string;
        enable_publishing?: boolean;
        allow_symbol_change?: boolean;
        container_id?: string;
        width?: number | string;
        height?: number | string;
      }) => {
        onChartReady?: (callback: () => void) => void;
      };
    };
  }
}

export {};
