export const commandMenuSnippet = `// ⌘K: глобальный шорткат + стеклянная палитра команд
const toggle = useCallback(() => setOpen(v => !v), []);
useKeyboardShortcut('k', toggle, { metaOrCtrl: true });  // hooks/useCommandMenu

{open && (
  <>
    <button aria-label="Закрыть" className="fixed inset-0 z-[160] bg-black/55 backdrop-blur-[5px]"
            onClick={close} />
    <FocusScope contain restoreFocus autoFocus>
      <div role="dialog" aria-label="Командное меню"
           className="palette fixed left-1/2 top-[13vh] z-[170] …
                      bg-[#16181F]/85 backdrop-blur-2xl">
        <input role="combobox" aria-activedescendant={activeId}
               onKeyDown={arrowsEnterEscape} />
        {GROUPS.map(group => <Group key={group} items={filter(group)} />)}
        <footer>↑↓ выбор · ↵ запуск · esc закрыть</footer>
      </div>
    </FocusScope>
  </>
)}`;
