import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

import { useLayoutStore } from '@/lib/stores/layoutStore';
import { Button } from '@/shared/components/ui/button';

export function ResetLayoutButton() {
  const resetLayouts = useLayoutStore((s) => s.resetLayouts);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetLayouts();
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Reset layout?</span>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleReset}
        >
          Yes, Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(false)}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => setShowConfirm(true)}
      className="gap-2"
    >
      <RotateCcw className="h-4 w-4" />
      Reset Layout
    </Button>
  );
}
