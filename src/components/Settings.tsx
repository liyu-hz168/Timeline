type SettingsButtonProps = {
    isSettingsOpen: boolean;
    onClose: () => void;
};

const Settings = ({ isSettingsOpen, onClose }:SettingsButtonProps) => {
    //functions supported by settings page
    //  Change user profile pic
    //  Change username
    //  Change theme colors
    //  Change font
    //  Change font sizes
    if (!isSettingsOpen) return null; 
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay, for blurred background */}
        <div className="bg-gray absolute inset-0 bg-opacity-10 backdrop-blur-[2px]"></div>
        <div className="w-120 h-160 relative z-10 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          To be implemented...
          {/* Set Profile Picture */}
          {/* Theme */}
          {/* Close button */}
          <button
            onClick={() => {
              onClose();
            }}
            className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs text-white hover:bg-gray-400"
          >
            X
          </button>
          {/* Save settings */}
        </div>
      </div>
    );
}

export { Settings }