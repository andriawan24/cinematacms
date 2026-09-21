import { renderPage } from '../static/js/_helpers.js';
import { HomePage } from '../features/home';
import homeQueryClient from '../features/home/queryClient';
import { readInitialDataFromDom, seedHomeQueryClient } from '../features/home/initialData';

seedHomeQueryClient(homeQueryClient, readInitialDataFromDom());

renderPage('page-home', HomePage);
