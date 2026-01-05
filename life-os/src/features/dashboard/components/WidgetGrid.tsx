import {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

import { useLayoutStore } from '@/lib/stores/layoutStore';
import {
  getRegisteredWidgets,
  initializeWidgets,
  type Widget,
} from '@/features/widgets';
import { TODAY } from '@/shared/utils';

import { WidgetWrapper } from './WidgetWrapper';

// Import grid layout styles
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Dynamic import for react-grid-layout to avoid type issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ReactGridLayout: any = null;

/**
 * Grid configuration
 */
const GRID_COLS = 12;
const ROW_HEIGHT = 80;
const MARGIN: [number, number] = [16, 16];

interface GridLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
}

interface WidgetGridProps {
  date?: string;
}

export function WidgetGrid({ date = TODAY }: WidgetGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [widthReady, setWidthReady] = useState(false);
  const { layouts, enabledWidgets, setLayouts } = useLayoutStore();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [gridReady, setGridReady] = useState(false);

  // Load react-grid-layout dynamically
  useEffect(() => {
    import('react-grid-layout').then((mod) => {
      ReactGridLayout = mod.default;
      setGridReady(true);
    });
  }, []);

  // Initialize widgets on mount
  useEffect(() => {
    initializeWidgets().then(() => {
      setWidgets(getRegisteredWidgets());
      setIsReady(true);
    });
  }, []);

  // Use useLayoutEffect for synchronous width measurement before paint
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      if (container) {
        const newWidth = container.getBoundingClientRect().width;
        if (newWidth > 0) {
          setWidth(newWidth);
          setWidthReady(true);
        }
      }
    };

    // Use ResizeObserver for accurate container size tracking
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(container);

    // Delay initial measurement slightly to ensure layout is complete
    requestAnimationFrame(() => {
      updateWidth();
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Get current layout (default to 'lg')
  const currentLayout = (layouts.lg || []) as GridLayoutItem[];

  // Filter widgets to only show enabled ones
  const enabledWidgetList = widgets.filter((w) =>
    enabledWidgets.includes(w.config.id)
  );

  // Handle layout change
  const handleLayoutChange = useCallback(
    (newLayout: GridLayoutItem[]) => {
      setLayouts('lg', newLayout);
    },
    [setLayouts]
  );

  if (!isReady || !gridReady || !widthReady) {
    return (
      <div ref={containerRef} className="flex h-64 w-full items-center justify-center">
        <p className="text-muted-foreground">Loading widgets...</p>
      </div>
    );
  }

  if (enabledWidgetList.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          No widgets enabled. Go to Settings to add widgets.
        </p>
      </div>
    );
  }

  const gridChildren: ReactNode[] = enabledWidgetList.map((widget) => {
    const WidgetComponent = widget.component;
    return (
      <div key={widget.config.id} className="widget-container">
        <WidgetWrapper>
          <WidgetComponent id={widget.config.id} date={date} />
        </WidgetWrapper>
      </div>
    );
  });

  return (
    <div ref={containerRef} className="w-full">
      <ReactGridLayout
        className="layout"
        layout={currentLayout}
        cols={GRID_COLS}
        rowHeight={ROW_HEIGHT}
        width={width}
        margin={MARGIN}
        onLayoutChange={handleLayoutChange}
        isResizable={true}
        isDraggable={true}
        useCSSTransforms={true}
        compactType={null}
        preventCollision={false}
      >
        {gridChildren}
      </ReactGridLayout>
    </div>
  );
}
