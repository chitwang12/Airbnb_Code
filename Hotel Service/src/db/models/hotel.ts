import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import  sequelize  from "./sequelize"


class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {

    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
    declare location: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare rating?: number;
    declare rating_count?: number;
    declare deleted_at?: CreationOptional<Date | null>;
}


Hotel.init({
    id: {
        type: 'int',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: 'varchar',
        allowNull: false,
    },
    address: {
        type: 'varchar',
        allowNull: false,
    },
    location: {
        type: 'varchar',
        allowNull: false,
    },
    created_at: {
        type: 'timestamp',
        defaultValue: new Date(),
    },
    updated_at: {
        type: 'timestamp',
        defaultValue: new Date(),
    },
    deleted_at:{
        type:"Date",
        defaultValue:null
    },
    rating: {
        type: 'decimal',
        defaultValue: null,
    },
    rating_count: {
        type: 'int',
        defaultValue: null,
    }
}, {
    tableName: 'hotels',
    sequelize: sequelize,
    underscored: true,
    timestamps: false,
});


export default Hotel;