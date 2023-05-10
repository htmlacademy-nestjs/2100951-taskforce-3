import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const enum DefaultPort {
    DefaultPort = 3000,
    DefaultMongoPort = 27017,
    DefaultRabbitPort = 5672,
    DefaultSMTPPort = 25,
}

export interface NotifyConfig {
    environment: string;
    port: number;
    db: {
        host: string;
        port: number;
        user: string;
        name: string;
        password: string;
        authBase: string;
    },
    rabbit: {
        host: string;
        password: string;
        user: string;
        queue: string;
        exchange: string;
        port: number;
    },
    mail: {
        host: string;
        port: number;
        user: string;
        password: string;
        from: string;
    },
}

export default registerAs('application', (): NotifyConfig => {
    const config: NotifyConfig = {
        environment: process.env.NODE_ENV,
        port: parseInt(process.env.PORT || DefaultPort.DefaultPort.toString(), 10),
        db: {
            host: process.env.MONGO_HOST,
            port: parseInt(process.env.MONGO_PORT ?? DefaultPort.DefaultMongoPort.toString(), 10),
            name: process.env.MONGO_DB,
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            authBase: process.env.MONGO_AUTH_BASE,
        },
        rabbit: {
            host: process.env.RABBIT_HOST,
            password: process.env.RABBIT_PASSWORD,
            port: parseInt(process.env.RABBIT_PORT ?? DefaultPort.DefaultRabbitPort.toString(), 10),
            user: process.env.RABBIT_USER,
            queue: process.env.RABBIT_QUEUE,
            exchange: process.env.RABBIT_EXCHANGE,
        },
        mail: {
            host: process.env.MAIL_SMTP_HOST,
            port: parseInt(process.env.MAIL_SMTP_PORT ?? DefaultPort.DefaultSMTPPort.toString(), 10),
            user: process.env.MAIL_USER_NAME,
            password: process.env.MAIL_USER_PASSWORD,
            from: process.env.MAIL_FROM,
        }
    };

    const validationSchema = Joi.object<NotifyConfig>({
        environment: Joi.string()
            .valid('development', 'production', 'stage'),
        port: Joi.number()
            .port()
            .default(DefaultPort.DefaultPort),
        db: Joi.object({
            host: Joi.string().valid().hostname(),
            port: Joi.number().port(),
            name: Joi.string().required(),
            user: Joi.string().required(),
            password: Joi.string().required(),
            authBase: Joi.string().required(),
        }),
        rabbit: Joi.object({
            host: Joi.string().valid().hostname().required(),
            password: Joi.string().required(),
            port: Joi.number().port().default(DefaultPort.DefaultRabbitPort),
            user: Joi.string().required(),
            queue: Joi.string().required(),
            exchange: Joi.string().required(),
        }),
        mail: Joi.object({
            host: Joi.string().valid().hostname().required(),
            port: Joi.number().port().default(DefaultPort.DefaultSMTPPort),
            user: Joi.string().required(),
            password: Joi.string().required(),
            from: Joi.string().required(),
        })
    });

    const { error } = validationSchema.validate(config, { abortEarly: true });

    if (error) {
        throw new Error(
            `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
        );
    }

    return config;
});