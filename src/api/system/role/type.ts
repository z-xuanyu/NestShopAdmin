//添加角色
export interface AddRoleForm {
  name: string;
  description: string;
  menuIds?: Array<string>;
}

// 更新角色form
export interface UpdateRoleForm {
  name: string;
  description: string;
  menuIds?: Array<string>;
}

// 获取角色列表
export interface GetRoleList {
  pageSize: number;
  pageNumber: number;
  name: string
}