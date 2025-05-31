import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { BookOpen, User, GraduationCap, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Esquema de validación
const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  edad: z.number().min(1, "La edad debe ser mayor a 0").max(120, "La edad debe ser menor a 120"),
  educacion: z.string().min(1, "Por favor selecciona un nivel de educación"),
  respuestas: z.array(z.string()).length(11, "Debes responder todas las preguntas"),
});

type FormValues = z.infer<typeof formSchema>;

const KnowledgeTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("datos-personales");
  const [progress, setProgress] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      edad: undefined,
      educacion: "",
      respuestas: Array(11).fill(""),
    },
  });

  const preguntas = [
    {
      pregunta: "¿Qué significa la sigla PCL?",
      opciones: {
        a: "Programa de Conservación Local",
        b: "Proyecto de Clasificación de Líquidos",
        c: "Plan de Control de Limpieza"
      }
    },
    {
      pregunta: "¿Cuál es el objetivo principal del proyecto ReciPCL?",
      opciones: {
        a: "Reducir la contaminación ambiental",
        b: "Aumentar el consumo de plásticos",
        c: "Generar más residuos"
      }
    },
    {
      pregunta: "¿Qué tipo de residuos se pueden reciclar en el proyecto?",
      opciones: {
        a: "Solo papel y cartón",
        b: "Plástico, papel, vidrio y metal",
        c: "Solo residuos orgánicos"
      }
    },
    {
      pregunta: "¿Cuál es el proceso correcto para clasificar residuos?",
      opciones: {
        a: "Mezclar todo en una sola bolsa",
        b: "Separar por tipo y limpiar antes de reciclar",
        c: "Quemar los residuos"
      }
    },
    {
      pregunta: "¿Qué beneficios tiene el reciclaje para el medio ambiente?",
      opciones: {
        a: "Aumenta la contaminación",
        b: "Reduce la contaminación y conserva recursos",
        c: "No tiene ningún beneficio"
      }
    },
    {
      pregunta: "¿Cómo se debe preparar el PET antes de reciclarlo?",
      opciones: {
        a: "Lavarlo y aplastarlo",
        b: "Dejarlo con residuos",
        c: "Rompido en pedazos"
      }
    },
    {
      pregunta: "¿Qué materiales NO se pueden reciclar en el proyecto?",
      opciones: {
        a: "Papel y cartón",
        b: "Plásticos contaminados y residuos peligrosos",
        c: "Vidrio y metal"
      }
    },
    {
      pregunta: "¿Cuál es el horario de recolección de residuos?",
      opciones: {
        a: "Solo los fines de semana",
        b: "De lunes a viernes de 8:00 a 16:00",
        c: "No hay horario establecido"
      }
    },
    {
      pregunta: "¿Dónde se encuentran los contenedores de reciclaje?",
      opciones: {
        a: "Solo en el centro de la ciudad",
        b: "En puntos estratégicos del plantel",
        c: "No hay contenedores"
      }
    },
    {
      pregunta: "¿Qué hacer si hay dudas sobre la clasificación de residuos?",
      opciones: {
        a: "Mezclar todo",
        b: "Consultar con el personal del proyecto",
        c: "Ignorar las dudas"
      }
    },
    {
      pregunta: "¿Cómo se puede participar activamente en el proyecto?",
      opciones: {
        a: "Solo observando",
        b: "Clasificando residuos y difundiendo el proyecto",
        c: "No hay forma de participar"
      }
    }
  ];

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: insertError } = await supabase
        .from('knowledge_test_responses')
        .insert([{
          name: data.nombre,
          age: data.edad,
          education_level: data.educacion,
          answers: data.respuestas,
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        setProgress(0);
        setCurrentTab("datos-personales");
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting test:', error);
      setError('Hubo un error al enviar el test. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (value === "cuestionario") {
      setProgress(50);
    }
  };

  const handleAnswerChange = (index: number) => {
    const answeredQuestions = form.getValues("respuestas").filter(r => r !== "").length;
    setProgress(50 + (answeredQuestions / preguntas.length) * 50);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <BookOpen className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Prueba de Conocimientos</h1>
          <p className="text-gray-600 text-lg">
            Demuestra tu conocimiento sobre el proyecto ReciPCL y la gestión de residuos
          </p>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Progreso: {progress}%
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="border-2 border-primary-100 shadow-lg">
              <CardHeader className="bg-primary-50 border-b border-primary-100">
                <CardTitle className="text-2xl font-bold text-primary-700">Proyecto 'ReciPCL'</CardTitle>
                <CardDescription className="text-primary-600">
                  Encuesta realizada por estudiantes del CBTIS 145
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {error && (
                  <div className="mb-6 p-4 bg-error-500 bg-opacity-10 border border-error-500 rounded-lg">
                    <p className="text-error-500 text-sm flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {error}
                    </p>
                  </div>
                )}

                <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="datos-personales" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Datos Personales
                    </TabsTrigger>
                    <TabsTrigger value="cuestionario" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Cuestionario
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="datos-personales">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ingresa tu nombre completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="edad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Edad</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Ingresa tu edad"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="educacion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nivel de educación</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona tu nivel de educación" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="secundaria">Secundaria</SelectItem>
                                <SelectItem value="preparatoria">Preparatoria</SelectItem>
                                <SelectItem value="universidad">Universidad</SelectItem>
                                <SelectItem value="posgrado">Posgrado</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="cuestionario">
                    <div className="space-y-8">
                      {preguntas.map((pregunta, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={`respuestas.${index}`}
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-lg font-medium">
                                {`${index + 1}. ${pregunta.pregunta}`}
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    handleAnswerChange(index);
                                  }}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-3"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <FormControl>
                                      <RadioGroupItem value="a" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {pregunta.opciones.a}
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <FormControl>
                                      <RadioGroupItem value="b" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {pregunta.opciones.b}
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                    <FormControl>
                                      <RadioGroupItem value="c" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {pregunta.opciones.c}
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              <CardFooter className="bg-gray-50 border-t border-gray-200 p-6">
                <Button 
                  type="submit" 
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Enviar respuestas
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default KnowledgeTest; 