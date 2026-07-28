import { Spinner } from "./Button";

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <Spinner className="h-6 w-6 text-slate-500" />
    </div>
  );
}

export default Loader;
