import { SetMetadata } from "@nestjs/common";
import { SortOrder, SortType, UserRole } from "@project/shared/app-types";

export const DEFAULT_TASK_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = 'desc';
export const DEFAULT_PAGINATION_COUNT = 1;

export const minTitleLength = 20;
export const maxTitleLength = 50;

export const minDescriptionLength = 100;
export const maxDescriptionLength = 1024;

export const minAddressLength = 10;
export const maxAddressLength = 255;

export const TASK_TITLE_LENGTH = `Task title length shall be between ${minTitleLength} and ${maxTitleLength} chars.`
export const TASK_DESCRIPTION_LENGTH = `Task description length shall be between ${minDescriptionLength} and ${maxDescriptionLength} chars.`
export const TASK_ADDRESS_LENGTH = `Task address length shall be between ${minAddressLength} and ${maxAddressLength} chars.`
export const TASK_DUEDATE_NOT_VALID = 'The due date is not valid.';
export const TASK_STATUS_NOT_VALID = 'Status Not Valid'

export const DEFAULT_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_SORT_TYPE = SortType.CreatedAt;

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);