type Props = {
  scale?: string;
};
function Loader(props: Props) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`rounded-full border-transparent bg-conic from-[var(--divider-1)] to-transparent animate-spin border-4 size-12 ${props.scale}`}
        style={{
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          WebkitMaskImage:
            "linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)",
          WebkitMaskClip: "padding-box, border-box",
          WebkitMaskComposite: "destination-out",
          maskImage: "linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)",
          maskClip: "padding-box, border-box",
          maskComposite: "exclude",
        }}
      />
    </div>
  );
}
export default Loader;
