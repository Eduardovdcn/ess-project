import { Router } from 'express';

import UserRouter from './UserRoutes';
import deliveryPersonRouter from './DeliveryPersonRoutes';
import itensRouter from './ItensRoutes';
const router = Router();

router.use('/user', UserRouter);
router.use('/deliveryperson', deliveryPersonRouter);
router.use('/itens', itensRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
