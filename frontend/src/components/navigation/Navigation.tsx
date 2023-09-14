export const Navigation = ({ title }: { title: string }) => {
  return (
    <div className="navbar bg-primary">
      <a className="btn btn-ghost text-xl normal-case text-white">{title}</a>
    </div>
  );
};
