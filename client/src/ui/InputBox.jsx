function InputBox({ label, placeholder, type, onChange }) {
  return (
    <div className="w-full">
      <div className="m-1 sm:m-2 text-md sm:text-xl font-bold tracking-tighter">
        {label}
      </div>
      <input
        type={type}
        onChange={onChange}
        className="border-gray-200 border-2 py-2 pl-2 pr-28 rounded-md w-full"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputBox;
