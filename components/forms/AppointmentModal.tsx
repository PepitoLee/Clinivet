import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, Heart, FileText, CheckCircle } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from '../ui/Modal';
import { Input, Select, Textarea } from '../ui/Input';
import { AppointmentForm } from '../../types';

const initialForm: AppointmentForm = {
  ownerName: '',
  phone: '',
  email: '',
  petName: '',
  petType: 'perro',
  service: '',
  date: '',
  time: '',
  notes: '',
};

const petTypes = [
  { value: 'perro', label: '🐕 Perro' },
  { value: 'gato', label: '🐈 Gato' },
  { value: 'ave', label: '🐦 Ave' },
  { value: 'roedor', label: '🐹 Roedor' },
  { value: 'reptil', label: '🦎 Reptil' },
  { value: 'otro', label: '🐾 Otro' },
];

const services = [
  { value: 'consulta', label: 'Consulta General' },
  { value: 'vacunacion', label: 'Vacunación' },
  { value: 'cirugia', label: 'Cirugía' },
  { value: 'dental', label: 'Limpieza Dental' },
  { value: 'emergencia', label: 'Emergencia' },
  { value: 'estetica', label: 'Estética y Grooming' },
  { value: 'laboratorio', label: 'Análisis de Laboratorio' },
];

const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
];

export const AppointmentModal: React.FC = () => {
  const { isOpen, modalType, closeModal } = useModal();
  const { isDark } = useTheme();
  const [form, setForm] = useState<AppointmentForm>(initialForm);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentForm, string>>>({});

  const isAppointmentModal = modalType === 'appointment';

  const handleChange = (field: keyof AppointmentForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof AppointmentForm, string>> = {};

    if (currentStep === 1) {
      if (!form.ownerName.trim()) newErrors.ownerName = 'Nombre requerido';
      if (!form.phone.trim()) newErrors.phone = 'Teléfono requerido';
      if (!form.email.trim()) newErrors.email = 'Email requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = 'Email inválido';
      }
    }

    if (currentStep === 2) {
      if (!form.petName.trim()) newErrors.petName = 'Nombre de mascota requerido';
      if (!form.service) newErrors.service = 'Selecciona un servicio';
    }

    if (currentStep === 3) {
      if (!form.date) newErrors.date = 'Selecciona una fecha';
      if (!form.time) newErrors.time = 'Selecciona un horario';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Here you would typically send the form data to an API
      console.log('Appointment submitted:', form);
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    closeModal();
    // Reset state after animation
    setTimeout(() => {
      setForm(initialForm);
      setStep(1);
      setIsSubmitted(false);
      setErrors({});
    }, 300);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Modal isOpen={isOpen && isAppointmentModal} onClose={handleClose} size="lg">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className={`text-3xl font-serif mb-4 ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
              ¡Cita Agendada!
            </h3>
            <p className={`mb-8 max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/70'}`}>
              Hemos recibido tu solicitud. Te enviaremos un correo de confirmación
              a <strong className="text-vet-orange-deep">{form.email}</strong> con todos los detalles.
            </p>
            <div className={`rounded-[1.5rem] p-6 mb-8 text-left max-w-sm mx-auto border ${isDark ? 'bg-white/[0.03] border-white/[0.06]' : 'bg-vet-warm border-vet-blue-dark/[0.06]'}`}>
              <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-vet-blue-dark/60'}`}>Resumen de tu cita</p>
              <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-vet-blue-dark'}`}>{form.petName} - {services.find(s => s.value === form.service)?.label}</p>
              <p className="text-vet-orange-deep">{new Date(form.date).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las {timeSlots.find(t => t.value === form.time)?.label}</p>
            </div>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-vet-blue-dark text-white rounded-full font-medium hover:bg-vet-blue-dark/90 transition-colors"
            >
              Entendido
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-vet-blue-dark p-8 text-white relative overflow-hidden">
              <h2 className="font-serif text-3xl text-white mb-2">Agenda tu Cita</h2>
              <p className="text-white/50 font-light">
                Estamos a 3 pasos de cuidar a tu mejor amigo
              </p>

              {/* Progress indicator */}
              <div className="flex gap-2 mt-6">
                {[1, 2, 3].map((s) => (
                  <motion.div
                    key={s}
                    className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-vet-orange-deep' : 'bg-white/10'}`}
                    initial={false}
                    animate={{ scaleX: s <= step ? 1 : 0.5 }}
                    style={{ originX: 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className={`font-serif text-xl mb-6 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
                      <User className="w-5 h-5 text-vet-orange-deep" />
                      Tus Datos
                    </h3>
                    <Input
                      label="Nombre completo"
                      value={form.ownerName}
                      onChange={(e) => handleChange('ownerName', e.target.value)}
                      error={errors.ownerName}
                      icon={<User size={18} />}
                    />
                    <Input
                      label="Teléfono"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      error={errors.phone}
                      icon={<Phone size={18} />}
                    />
                    <Input
                      label="Correo electrónico"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                      icon={<Mail size={18} />}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className={`font-serif text-xl mb-6 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
                      <Heart className="w-5 h-5 text-vet-orange-deep" />
                      Datos de tu Mascota
                    </h3>
                    <Input
                      label="Nombre de tu mascota"
                      value={form.petName}
                      onChange={(e) => handleChange('petName', e.target.value)}
                      error={errors.petName}
                      icon={<Heart size={18} />}
                    />
                    <Select
                      label="Tipo de mascota"
                      value={form.petType}
                      onChange={(e) => handleChange('petType', e.target.value as AppointmentForm['petType'])}
                      options={petTypes}
                    />
                    <Select
                      label="Servicio requerido"
                      value={form.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      options={services}
                      error={errors.service}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className={`font-serif text-xl mb-6 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-vet-blue-dark'}`}>
                      <Calendar className="w-5 h-5 text-vet-orange-deep" />
                      Fecha y Hora
                    </h3>
                    <Input
                      label="Fecha"
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      error={errors.date}
                      min={minDate}
                      icon={<Calendar size={18} />}
                    />
                    <Select
                      label="Horario disponible"
                      value={form.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      options={timeSlots}
                      error={errors.time}
                    />
                    <Textarea
                      label="Notas adicionales (opcional)"
                      value={form.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Cuéntanos más sobre tu mascota o la razón de la visita..."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className={`px-6 py-3 border rounded-full font-medium transition-all ${isDark ? 'border-white/[0.1] text-slate-300 hover:bg-white/[0.04]' : 'border-vet-blue-dark/[0.1] text-vet-blue-dark hover:bg-vet-blue-dark/[0.04]'}`}
                  >
                    Atrás
                  </button>
                )}
                <button
                  onClick={step < 3 ? handleNext : handleSubmit}
                  className="flex-1 px-6 py-3 bg-vet-blue-dark text-white rounded-full font-medium hover:bg-vet-blue-dark/90 transition-colors flex items-center justify-center gap-2"
                >
                  {step < 3 ? (
                    <>Continuar</>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Confirmar Cita
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
