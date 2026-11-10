import type { IssueComment } from "@/types/issue";
import type { JSX } from "react";

interface PanelCommentsProps {
  comments: IssueComment[];
  listRef: React.RefObject<HTMLDivElement | null>;
}

/** Список комментариев задачи с авторами и временем */
export function PanelComments({ comments, listRef }: PanelCommentsProps): JSX.Element {
  return (
    <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
      {comments.map((comment) => (
        <figure key={comment.id} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8.5px] font-bold text-zinc-950"
            style={{ background: comment.color }}
          >
            {comment.initials}
          </span>
          <span className="min-w-0">
            <span className="flex items-baseline gap-2">
              <span className="text-[11.5px] font-medium text-zinc-300">{comment.author}</span>
              <span className="font-mono text-[9.5px] text-zinc-600">{comment.time}</span>
            </span>
            <span className="mt-0.5 block text-[12px] leading-snug text-zinc-400">{comment.body}</span>
          </span>
        </figure>
      ))}
    </div>
  );
}
