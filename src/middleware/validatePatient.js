const GENDERS = ['Female', 'Male', 'Other'];
const STATUSES = ['Active', 'Follow-up', 'Discharged'];
const blank = (v) => !v || !String(v).trim();

/** Validates the request body (all fields required) and attaches clean values to req.patient. */
module.exports = function validatePatient(req, res, next) {
  const b = req.body || {};
  const age = parseInt(b.age, 10);

  if (blank(b.full_name)) return res.status(400).json({ error: 'Full name is required.' });
  if (!Number.isInteger(age) || age < 0 || age > 130) return res.status(400).json({ error: 'Enter a valid age (0 to 130).' });
  if (!GENDERS.includes(b.gender)) return res.status(400).json({ error: 'Choose a gender.' });
  if (!/^\d{11}$/.test(String(b.phone || ''))) return res.status(400).json({ error: 'Phone number must be exactly 11 digits.' });
  if (blank(b.address)) return res.status(400).json({ error: 'Address is required.' });
  if (blank(b.diagnosis)) return res.status(400).json({ error: 'Diagnosis is required.' });
  if (!STATUSES.includes(b.status)) return res.status(400).json({ error: 'Choose a status.' });
  if (blank(b.visit_date)) return res.status(400).json({ error: 'Visit date is required.' });

  req.patient = [
    b.full_name.trim(), age, b.gender, b.phone,
    b.address.trim(), b.diagnosis.trim(), b.status, b.visit_date,
  ];
  next();
};
