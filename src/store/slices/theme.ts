import { createSlice } from '@reduxjs/toolkit';


interface ThemeState {
    isDarkTheme: boolean;
}

const initialState: ThemeState = {
    isDarkTheme: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // getCurrentTheme(state) {
        //     const theme = localStorage.getItem('theme') || 'light';
        //     state.isDarkTheme = theme === 'light' ? document.body.classList.contains('light') : document.body.classList.contains('dark');
        //     console.log(' state.isDarkTheme', state.isDarkTheme);
        // },
        // toggleTheme(state) {
        //     state.isDarkTheme = !state.isDarkTheme;
        //     const newTheme = state.isDarkTheme ? 'dark' : 'light';
        //     document.body.classList.toggle('dark', state.isDarkTheme);
        //     localStorage.setItem('theme', newTheme);
        // },
        // setTheme(state, action: PayloadAction<'dark' | 'light'>) {
        //     state.isDarkTheme = action.payload === 'dark';
        //     document.body.classList.toggle('dark', state.isDarkTheme);
        //     localStorage.setItem('theme', action.payload);
        // },
    },
});

// export const { toggleTheme, setTheme, getCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;
