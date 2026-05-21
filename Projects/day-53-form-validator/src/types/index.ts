// ============================================
// DISCRIMINATED UNION FOR FORM FIELDS
// ============================================

export type TextField = {
  type: "text";
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
};

export type EmailField = {
  type: "email";
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
};

export type NumberField = {
  type: "number";
  name: string;
  label: string;
  required?: boolean;
  min?: number;
  max?: number;
  placeholder?: string;
};

export type SelectField = {
  type: "select";
  name: string;
  label: string;
  required?: boolean;
  options: string[];
};

// Union of all field types
export type FormField = TextField | EmailField | NumberField | SelectField;

// ============================================
// LITERAL TYPES FOR VALIDATION RULES
// ============================================

export type ValidationRuleName = 
  | "required" 
  | "minLength" 
  | "maxLength" 
  | "min" 
  | "max" 
  | "email" 
  | "pattern";

export type ValidationResult = 
  | { valid: true } 
  | { valid: false; errors: string[] };

// ============================================
// SHAPE TYPES FOR DISCRIMINATED UNION DEMO
// ============================================

export type Circle = {
  kind: "circle";
  radius: number;
};

export type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

export type Square = {
  kind: "square";
  side: number;
};

export type Triangle = {
  kind: "triangle";
  base: number;
  height: number;
};

export type Shape = Circle | Rectangle | Square | Triangle;

// ============================================
// USER TYPE WITH INTERSECTION
// ============================================

export type WithId = {
  id: number;
};

export type WithTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type WithName = {
  name: string;
};

export type User = WithId & WithTimestamps & WithName & {
  email: string;
  age: number;
  isActive: boolean;
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.side ** 2;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}

export function formatArea(area: number): string {
  return area.toFixed(2);
}