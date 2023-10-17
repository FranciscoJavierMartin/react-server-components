import Spinner from "./components/spinner";

export default function Loading() {
  return (
    <div className="flex h-full grow items-center justify-center bg-gray-50">
      <Spinner className="-mt-16 w-8 animate-spin" />
    </div>
  );
}
