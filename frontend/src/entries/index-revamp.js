import { renderModernPage } from '../features/layout/renderModernPage';
import { HomePage } from '../features/home';
import homeQueryClient from '../features/home/queryClient';
import { readInitialDataFromDom, seedHomeInitialData } from '../features/home/initialData';

const initialData = readInitialDataFromDom();
seedHomeInitialData(homeQueryClient, initialData);

renderModernPage('page-home', HomePage);
