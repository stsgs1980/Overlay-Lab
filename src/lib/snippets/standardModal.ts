export const standardModalSnippet = `// Base UI Dialog: focus-trap, inert-фон и scroll-lock — из коробки
import { Dialog } from '@base-ui/react/dialog';

export function StandardModal({ open, onOpenChange, onCreate }: Props) {
  const submit = () => { onCreate?.(draft); onOpenChange(false); };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Затемнение + размытие */}
        <Dialog.Backdrop className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-[3px]" />
        <Dialog.Popup onKeyDown={cmdEnterCreates}
          className="fixed left-1/2 top-1/2 z-[150] w-[min(30rem,92vw)]
                     -translate-x-1/2 -translate-y-1/2 rounded-2xl …">
          <ModalHeader icon={<SquarePen />} title="Новая задача" />
          <ModalBody>
            <TextField id="title" value={title} onChange={setTitle} autoFocus />
            {/* поле описания + выбор приоритета */}
          </ModalBody>
          <ModalFooter align="between">
            <kbd>⌘↵</kbd><Button onClick={submit}>Создать задачу</Button>
          </ModalFooter>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`;
