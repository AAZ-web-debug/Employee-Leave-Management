const GlowBorderCard = ({
  children,
}) => {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-indigo-500/15
      bg-[#12161d]/95
      backdrop-blur-xl
      shadow-[0_0_30px_rgba(99,102,241,0.08)]
      "
    >
      <div
        className="
        absolute
        inset-0
        rounded-3xl
        pointer-events-none
        shadow-[0_0_60px_rgba(99,102,241,0.08)]
        "
      />

      {children}
    </div>
  );
};

export default GlowBorderCard;