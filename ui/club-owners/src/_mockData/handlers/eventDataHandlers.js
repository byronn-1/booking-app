import { eventData } from "../responses/bookings/eventData";
import { resourceData } from "../responses/bookings/resourceData";


const eventDataHandlers = [
/*     rest.get('https://localhost:3000/calendar', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(eventData));
      }),
      rest.get('https://localhost:3000/calendar', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(resourceData));
      }), */
];
export default eventDataHandlers;

