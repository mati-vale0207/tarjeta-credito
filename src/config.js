// Lista de meses permitidos para validación de fecha
const allowed = [
  "0", "0 ", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
];
 
// Otra lista con variantes para validar números individuales en el formateo
const allowed2 = [
  "00", "0", "0 ", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
];
 
export { allowed2 }; // Exporta named export
export default allowed;  // Exporta default