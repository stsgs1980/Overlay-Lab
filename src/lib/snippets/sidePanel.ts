export const sidePanelSnippet = `// React Aria: OverlayContainer + FocusScope + CSS transition
export function SidePanel({ open, onClose, issue }: Props) {
  const mounted = useDelayedUnmount(open, 380);   // exit-анимация
  const { dialogProps } = useDialog(
    { role: 'dialog', 'aria-label': \`Задача \${issue.id}\` }, panelRef);

  return (
    <OverlayContainer>            {/* дерево приложения → aria-hidden */}
      <FocusScope contain restoreFocus autoFocus>
        <aside
          {...dialogProps}
          onKeyDown={escapeCloses}
          className={cn('fixed right-3 top-3 bottom-3 z-[140] w-[400px] …',
            'translate-x-0 opacity-100 transition-all duration-[380ms]',
            !open && 'pointer-events-none translate-x-[112%] opacity-0')}
        >
          <header>{issue.id} <button onClick={onClose}>✕</button></header>
          {/* мета: статус · приоритет · исполнитель */}
          {/* скролл комментариев + композер с отправкой по Enter */}
        </aside>
      </FocusScope>
    </OverlayContainer>
  );
}`;
