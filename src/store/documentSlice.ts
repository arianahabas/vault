import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document, Toast } from "@/types";


interface DocumentState {
  items: Document[];
  toast: Toast;
}

// Load from localStorage or fallback to empty
const stored = typeof window !== 'undefined' ? localStorage.getItem('documents') : null;

const initialState: DocumentState = {
  items: stored ? JSON.parse(stored) : [],
  toast: { show: false, message: '', type: 'success' },
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.items.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(doc => doc.id !== action.payload);
    },
    showToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) {
      state.toast = { show: true, message: action.payload.message, type: action.payload.type };
    },
    hideToast(state) {
      state.toast.show = false;
    },
  },
});

export const { addDocument, removeDocument, showToast, hideToast } = documentSlice.actions;
export default documentSlice.reducer;