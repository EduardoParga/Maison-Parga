export function SectionTitle({ title, children, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`} data-reveal>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
