import { Router } from 'express';

import UserRouter from './UserRoutes';
import deliveryPersonRouter from './DeliveryPersonRoutes';
import itensRouter from './ItensRoutes';
import deliveryRouter from './DeliveryRoutes';
import ratingRouter from './RatingRoutes';
import PromotionRouter from './PromotionRoutes';
import cuponsRouter from './CuponsRoutes';
import DeliveryNotificationRouter from './DeliveryNotificationRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/deliveryperson', deliveryPersonRouter);
router.use('/itens', itensRouter);
router.use('/delivery', deliveryRouter);
router.use('/rating', ratingRouter);

router.use('/promotion', PromotionRouter);
router.use('/cupons', cuponsRouter);
router.use('/delivery-notifications', DeliveryNotificationRouter);

router.route('/').get((_, res) => {
  res.status(200).send('🚀 ESS Server running');
});

export default router;
