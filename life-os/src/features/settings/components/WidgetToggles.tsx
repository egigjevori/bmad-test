import { getWidgetConfigs } from '@/features/widgets/registry';
import { useLayoutStore } from '@/lib/stores/layoutStore';
import { Switch } from '@/shared/components/ui/switch';

export function WidgetToggles() {
  const widgets = getWidgetConfigs();
  const { toggleWidget, isWidgetEnabled } = useLayoutStore();

  return (
    <div className="space-y-4">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        const enabled = isWidgetEnabled(widget.id);

        return (
          <div
            key={widget.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {widget.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {widget.description}
                </p>
              </div>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={() => toggleWidget(widget.id)}
              aria-label={`Toggle ${widget.name} widget`}
            />
          </div>
        );
      })}
    </div>
  );
}
