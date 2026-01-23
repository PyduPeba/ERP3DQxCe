"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Building2, User, Phone, MapPin, FileText } from "lucide-react";
import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { toast } from "sonner";

export default function NewClientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    tipo: "PF",
    nome: "",
    nomeFantasia: "",
    cpfCnpj: "",
    ie: "",
    telefone: "",
    whatsapp: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    observacoes: "",
    status: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore
    const checked = e.target.checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCepBlur = async () => {
      const cep = formData.cep.replace(/\D/g, '');
      if (cep.length === 8) {
          try {
              const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
              const data = await res.json();
              if (!data.erro) {
                  setFormData(prev => ({
                      ...prev,
                      logradouro: data.logradouro,
                      bairro: data.bairro,
                      cidade: data.localidade,
                      estado: data.uf
                  }));
                  toast.success("Endereço encontrado!");
              }
          } catch (error) {
              console.error("Erro ao buscar CEP", error);
          }
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar cliente");
      }

      toast.success("Cliente cadastrado com sucesso!");
      router.push("/clientes");
    } catch (error: any) {
      console.error("Erro:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/clientes"
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Novo Cliente</h1>
            <p className="text-gray-500">Cadastre um novo cliente PF ou PJ</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Dados Gerais */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Dados Gerais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cliente *</label>
                    <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="PF">Pessoa Física</option>
                        <option value="PJ">Pessoa Jurídica</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <label className="relative inline-flex items-center cursor-pointer mt-2">
                        <input 
                            type="checkbox" 
                            name="status"
                            checked={formData.status} 
                            onChange={handleChange}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">Ativo</span>
                    </label>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome / Razão Social *</label>
                    <input
                        type="text"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {formData.tipo === 'PJ' && (
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia</label>
                        <input
                            type="text"
                            name="nomeFantasia"
                            value={formData.nomeFantasia}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{formData.tipo === 'PF' ? 'CPF' : 'CNPJ'} *</label>
                    <input
                        type="text"
                        name="cpfCnpj"
                        required
                        value={formData.cpfCnpj}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        placeholder={formData.tipo === 'PF' ? '000.000.000-00' : '00.000.000/0000-00'}
                    />
                </div>

                {formData.tipo === 'PJ' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Inscrição Estadual</label>
                        <input
                            type="text"
                            name="ie"
                            value={formData.ie}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Phone size={20} className="text-blue-600" />
                Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                     <input
                         type="text"
                         name="telefone"
                         value={formData.telefone}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="(00) 0000-0000"
                     />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                     <input
                         type="text"
                         name="whatsapp"
                         value={formData.whatsapp}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="(00) 90000-0000"
                     />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                     <input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                Endereço
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* CEP com blur para busca */}
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                     <input
                         type="text"
                         name="cep"
                         value={formData.cep}
                         onChange={handleChange}
                         onBlur={handleCepBlur}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="00000-000"
                     />
                </div>
                <div className="md:col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro</label>
                     <input
                         type="text"
                         name="logradouro"
                         value={formData.logradouro}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                     <input
                         type="text"
                         name="numero"
                         value={formData.numero}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                     <input
                         type="text"
                         name="bairro"
                         value={formData.bairro}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                     <input
                         type="text"
                         name="cidade"
                         value={formData.cidade}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                     <input
                         type="text"
                         name="estado"
                         value={formData.estado}
                         onChange={handleChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                         maxLength={2}
                     />
                </div>
            </div>
          </div>

          {/* Observações */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
             <textarea
                 name="observacoes"
                 value={formData.observacoes}
                 onChange={handleChange}
                 rows={3}
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Link
              href="/clientes"
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium border border-gray-200"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? "Salvando..." : "Salvar Cliente"}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
