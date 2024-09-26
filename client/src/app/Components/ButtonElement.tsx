interface IButton {
  title: string;
  handleClick(): void;
}
export default function ButtonElement({ title, handleClick }: IButton) {
  return (
    <button
      onClick={handleClick}
      className='rounded-md bg-[#0E2D3B] active:bg-[#0c2531] hover:bg-[#133c4f] text-white py-3 mt-8'
    >
      {title}
    </button>
  );
}
