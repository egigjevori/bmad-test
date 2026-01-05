import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

import { CalendarStrip } from './CalendarStrip';

export function BottomBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <motion.div
        className="border-t bg-background/95 backdrop-blur-sm"
        animate={{ height: isCollapsed ? 40 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="mx-auto flex h-full max-w-2xl flex-col">
          {/* Toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-6 w-full items-center justify-center hover:bg-muted/50"
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {/* Calendar Strip */}
          <div className="flex-1 overflow-hidden py-1">
            <CalendarStrip isCollapsed={isCollapsed} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
