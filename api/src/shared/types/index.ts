import { Document, Model } from "mongoose";
declare global {
    namespace Express {
        export interface Request {
            currentUser: Document;
        }
    }

    namespace Models {
        export type UserModel = Model<Document>;
        export type PermissionModel = Model<Document>;
        export type GroupModel = Model<Document>;
        export type AuthGroupModel = Model<Document>;
        // export type RefreshTokenModel = Model<Document>;
        // export type BlacklistTokenModel = Model<Document>;
        // export type EmployeeModel = Model<Document>;
        // export type AttendanceModel = Model<Document>;
        // export type FileModel = Model<Document>;
        // export type LeaveCreditsModel = Model<Document>;
        // export type ClientModel = Model<Document>;
        // export type ProjectModel = Model<Document>;
        // export type DocumentModel = Model<Document>;
        // export type CommentModel = Model<Document>;
        // export type PermissionModel = Model<Document>;
        // export type ModuleModel = Model<Document>;
        // export type RoleModel = Model<Document>;
        // export type SalaryModel = Model<Document>;
        // export type LoanModel = Model<Document>;
        // export type CompanySettingsModel = Model<Document>;
        // export type ReceivablesModel = Model<Document>;
        // export type ProjectTransactionsModel = Model<Document>;
        // export type AssetModel = Model<Document>;
        // export type AssetLogModel = Model<Document>;
        // export type OnBoardingCheckListModel = Model<Document>;
    }
}