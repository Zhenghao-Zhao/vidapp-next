type Prop = {
  title: string;
  onSelect: () => void;
  selectedChip: string;
}

export default function Chip({ title, onSelect, selectedChip}: Prop) {
  const handleClick = (): void => {
    onSelect();
  }
  const styles = selectedChip === title? "bg-black text-white" : "hover:bg-btn-hover bg-btn-primary";
  return (
    <button onClick={ handleClick } className={`flex-shrink-0 px-2 py-1.5 rounded-md ${styles}`}>
      { title }
    </button>
  )
}