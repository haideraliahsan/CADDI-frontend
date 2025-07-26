type Mode = 'draw' | 'move' | 'select' | 'comment' | 'delete';

type ToolbarProps = {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

const Toolbar: React.FC<ToolbarProps> = ({ mode, setMode }) => {
  const modes: Mode[] = ['draw', 'move', 'select', 'comment', 'delete'];

  return (
    <div className="flex gap-2 mb-4">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`px-4 py-1 rounded border text-sm transition ${
            mode === m
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
