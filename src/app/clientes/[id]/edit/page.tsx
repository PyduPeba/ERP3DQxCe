"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Building2, User, Phone, MapPin, FileText, Trash2 } from "lucide-react";
import DashboardLayout from "@/app/components/layout/DashboardLayout";
import { toast } from "sonner";

export default function EditClientePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
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

  interface Departamento { id: number; nome: string; responsavel: string | null; email: string | null; }
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [newDept, setNewDept] = useState({ nome: "", responsavel: "", email: "" });

  useEffect(() => {
    fetchCliente();
  }, []);

  const fetchCliente = async () => {
      try {
          const res = await fetch(`/api/clientes/${params.id}`);
          const data = await res.json();
          
          if (!res.ok) throw new Error(data.error);

          setFormData({
              tipo: data.tipo,
              nome: data.nome,
              nomeFantasia: data.nomeFantasia || "",
              cpfCnpj: data.cpfCnpj,
              ie: data.ie || "",
              telefone: data.telefone || "",
              whatsapp: data.whatsapp || "",
              email: data.email || "",
              cep: data.cep || "",
              logradouro: data.logradouro || "",
              numero: data.numero || "",
              bairro: data.bairro || "",
              cidade: data.cidade || "",
              estado: data.estado || "",
              observacoes: data.observacoes || "",
              status: data.status,
          });
      } catch (error) {
          console.error("Erro ao carregar cliente:", error);
          toast.error("Erro ao carregar dados do cliente");
          router.push("/clientes");
      } finally {
          setLoading(false);
          fetchDepartamentos(); // Load departments after client
      }
  }

  const fetchDepartamentos = async () => {
      try {
          const res = await fetch(`/api/clientes/${params.id}/departamentos`);
          if (res.ok) setDepartamentos(await res.json());
      } catch (e) { console.error(e); }
  }

  const handleAddDepartamento = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newDept.nome) return toast.error("Nome do setor é obrigatório");
      try {
          const res = await fetch(`/api/clientes/${params.id}/departamentos`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newDept)
          });
          if (res.ok) {
              const created = await res.json();
              setDepartamentos([...departamentos, created]);
              setNewDept({ nome: "", responsavel: "", email: "" });
              toast.success("Departamento adicionado!");
          } else { toast.error("Erro ao adicionar"); }
      } catch (e) { toast.error("Erro ao salvar departamento"); }
  }

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
                  toast.success("Endereço atualizado!");
              }
          } catch (error) {
              console.error("Erro ao buscar CEP", error);
          }
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/clientes/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao atualizar cliente");
      }

      toast.success("Cliente atualizado com sucesso!");
      router.push("/clientes");
    } catch (error: any) {
      console.error("Erro:", error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
      return (
          <DashboardLayout>
              <div className="h-64 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
          </DashboardLayout>
      )
  }

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
            <h1 className="text-2xl font-bold text-gray-900">Editar Cliente</h1>
            <p className="text-gray-500">Atualize os dados do cliente</p>
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

          {/* DEPARTAMENTOS / SETORES */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-blue-600" />
                Departamentos / Setores
            </h2>
            <p className="text-sm text-gray-500 mb-4">Cadastre os setores (ex: RH, TI, Financeiro) para vincular em OS e Chamados.</p>
            
            <div className="space-y-4 mb-6">
                {departamentos.length === 0 && <span className="text-gray-400 italic text-sm">Nenhum departamento cadastrado.</span>}
                {departamentos.map(dept => (
                    <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <strong className="text-gray-900 block">{dept.nome}</strong>
                            <div className="text-xs text-gray-500 mt-1 flex gap-3">
                                {dept.responsavel && <span className="flex items-center gap-1"><User size={10} /> {dept.responsavel}</span>}
                                {dept.email && <span className="flex items-center gap-1"><FileText size={10} /> {dept.email}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div>
                        <label className="text-xs font-semibold text-gray-500">Nome do Setor</label>
                        <input className="w-full p-2 border rounded-lg text-sm" placeholder="Ex: Informática" value={newDept.nome} onChange={e => setNewDept({...newDept, nome: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500">Responsável</label>
                        <input className="w-full p-2 border rounded-lg text-sm" placeholder="Gerante" value={newDept.responsavel} onChange={e => setNewDept({...newDept, responsavel: e.target.value})} />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="text-xs font-semibold text-gray-500">Email Setor</label>
                            <input className="w-full p-2 border rounded-lg text-sm" placeholder="ti@empresa.com" value={newDept.email} onChange={e => setNewDept({...newDept, email: e.target.value})} />
                        </div>
                        <button type="button" onClick={handleAddDepartamento} className="h-9 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium text-sm self-end">
                            + Adicionar
                        </button>
                    </div>
                </div>
            </div>
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
              disabled={saving}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
