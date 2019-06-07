import UndoManager from 'undo-manager';

let undoManager;
if (!undoManager) {
  undoManager = new UndoManager();
}

export default undoManager;
