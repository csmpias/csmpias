export function PostBodyHtml({ html }: { html: string }) {
  return (
    <div
      className="post-body-html mx-auto flex max-w-[70ch] flex-col gap-5 font-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
