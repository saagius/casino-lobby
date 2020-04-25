import * as express from 'express';
const router = express.Router();

import {
    getAllGames,
    getGameById,
    getDistinctByType,
    getDistinctProviders,
    searchGamesByProp,
    getGamesByCategory,
    getGamesByProvider
} from './helper';

router.get('/', (req, res) => {
    res.json(getAllGames());
});

router.get('/id/:id', (req, res) => {
    const id = req.params.id;
    res.json(getGameById(id));
});

router.get('/categories', (req, res) => {
    res.json(getDistinctByType('cats'));
});

router.get('/features', (req, res) => {
    res.json(getDistinctByType('feats'));
});

router.get('/themes', (req, res) => {
    res.json(getDistinctByType('thms'));
});

router.get('/providers', (req, res) => {
    res.json(getDistinctProviders());
});

router.get('/search/by/:prop/:term', (req, res) => {
    const {
        prop,
        term
    } = req.params;

    res.json(searchGamesByProp(prop, term));
});

router.get('/by/category/:id', (req, res) => {
    const {
        id
    } = req.params;

    res.json(getGamesByCategory(id));
});

router.get('/by/provider/:id', (req, res) => {
    const {
        id
    } = req.params;

    res.json(getGamesByProvider(id));
});

export default router;