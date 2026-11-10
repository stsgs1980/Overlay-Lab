export const richPopoverSnippet = `// React Aria: позиционирование от якоря + закрытие по Escape/клику вне
const state = useOverlayTriggerState({ isOpen: open, onOpenChange });
const { popoverProps } = usePopover(
  { triggerRef, popoverRef, placement: 'bottom start', offset: 8 }, state);

<button ref={triggerRef} onClick={state.toggle}
        aria-haspopup="listbox" aria-expanded={open}>
  <Flag /> {PRIORITY_LABEL[value]} <ChevronDown />
</button>

{open && createPortal(
  <FocusScope contain restoreFocus autoFocus>
    <div ref={popoverRef} {...popoverProps}
         role="listbox" aria-label="Приоритет"
         style={{ ...popoverProps.style, zIndex: Z.popover }}
         className="w-56 rounded-xl border … backdrop-blur-xl
                    shadow-[0_24px_70px_-12px_rgba(0,0,0,.8)]">
      {PRIORITY_ORDER.map(level => (
        <button role="option" aria-selected={level === value}
                onClick={() => { onChange(level); state.close(); }}>
          <Flag className={tone(level)} /> {PRIORITY_LABEL[level]}
        </button>
      ))}
    </div>
  </FocusScope>,
  document.body)}`;
