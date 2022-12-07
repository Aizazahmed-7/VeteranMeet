import express from 'express';
import connectDB from './config/db.js';
import veteranRoutes from './routes/veteranRoutes.js';
import organizationRoutes from './routes/OrganizationRoutes.js';
import eventRoutes from './routes/EventRoute.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';


connectDB();
const app = express();
app.use(express.json());


app.use('/api/Veteran',veteranRoutes); 
app.use('/api/Organization',organizationRoutes); 
app.use('/api/Event',eventRoutes); 
app.use('/api/upload',uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.use(notFound)
app.use(errorHandler)

app.listen(5000, () => {
    console.log('Server started on port 5000');
    });