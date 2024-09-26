interface IProps {
  value: string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  labelTitle: string;
  placeholder: string;
  name: string;
}

export default function InputElement({
  labelTitle,
  name,
  placeholder,
  value,
  handleChange,
}: IProps) {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor='name'>{labelTitle}</label>
      <input
        className=' rounded-md border bg-[#E7F0FF] px-6 py-3 focus:outline-none'
        name={name}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
