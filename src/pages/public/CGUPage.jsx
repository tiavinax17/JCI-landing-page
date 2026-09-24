import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  UserCheck,
  Globe2,
  Mail,
} from "lucide-react";

const CGUPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      number: "01",
      title: "Objet du site",
      icon: Globe2,
      content: (
        <p>
          Le site officiel de la <strong>JCI Madagascar</strong> a pour
          vocation de présenter l'organisation, ses valeurs, ses activités,
          ses programmes, ses événements ainsi que son réseau d'organisations
          locales.
        </p>
      ),
    },
    {
      number: "02",
      title: "Acceptation des conditions",
      icon: UserCheck,
      content: (
        <>
          <p>
            L'accès et l'utilisation du présent site impliquent l'acceptation
            pleine et entière des présentes Conditions Générales d'Utilisation.
          </p>

          <p>
            Si vous n'acceptez pas ces conditions, nous vous invitons à ne pas
            utiliser le site.
          </p>
        </>
      ),
    },
    {
      number: "03",
      title: "Accès au site",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            Le site est accessible gratuitement à tout utilisateur disposant
            d'un accès à Internet.
          </p>

          <p>
            JCI Madagascar s'efforce de maintenir le site accessible et
            fonctionnel. Toutefois, l'accès peut être temporairement
            interrompu, notamment pour des raisons de maintenance, de mise à
            jour ou de contraintes techniques.
          </p>

          <p>
            JCI Madagascar ne peut être tenue responsable des interruptions
            indépendantes de sa volonté.
          </p>
        </>
      ),
    },
    {
      number: "04",
      title: "Contenu et informations",
      icon: FileText,
      content: (
        <>
          <p>
            Les informations publiées sur ce site sont fournies à titre
            informatif et peuvent être modifiées ou mises à jour à tout
            moment.
          </p>

          <p>
            JCI Madagascar s'efforce de fournir des informations exactes et
            actualisées, sans toutefois garantir l'exhaustivité ou
            l'absence d'erreurs dans l'ensemble des contenus publiés.
          </p>
        </>
      ),
    },
    {
      number: "05",
      title: "Propriété intellectuelle",
      icon: FileText,
      content: (
        <>
          <p>
            L'ensemble des éléments présents sur ce site, notamment les
            textes, photographies, illustrations, logos, graphismes, vidéos,
            icônes et éléments graphiques, est protégé par les dispositions
            applicables en matière de propriété intellectuelle.
          </p>

          <p>
            Sauf autorisation préalable et expresse, toute reproduction,
            représentation, modification, adaptation ou redistribution de tout
            ou partie du contenu du site est interdite.
          </p>

          <p>
            Les marques et logos appartenant à JCI ou à JCI Madagascar ne
            peuvent être utilisés sans autorisation conformément aux règles
            applicables à l'identité de marque de JCI.
          </p>
        </>
      ),
    },
    {
      number: "06",
      title: "Utilisation du site",
      icon: UserCheck,
      content: (
        <>
          <p>
            L'utilisateur s'engage à utiliser le site de manière légale,
            responsable et respectueuse des droits des tiers.
          </p>

          <p>
            Il est notamment interdit d'utiliser le site pour introduire,
            transmettre ou diffuser tout contenu susceptible de porter atteinte
            au fonctionnement du site ou aux droits d'autrui.
          </p>
        </>
      ),
    },
    {
      number: "07",
      title: "Liens vers des sites tiers",
      icon: Globe2,
      content: (
        <p>
          Le site peut contenir des liens vers des sites ou services externes.
          Ces liens sont proposés à titre informatif. JCI Madagascar ne
          contrôle pas nécessairement le contenu, la disponibilité ou les
          pratiques de ces sites tiers et ne saurait être tenue responsable de
          leur contenu.
        </p>
      ),
    },
    {
      number: "08",
      title: "Données personnelles",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            Lorsque certaines fonctionnalités du site nécessitent la collecte
            d'informations personnelles, celles-ci sont traitées conformément
            aux règles applicables en matière de protection des données.
          </p>

          <p>
            Les données collectées sont utilisées uniquement pour les finalités
            correspondant aux services proposés par le site, dans les limites
            prévues par la réglementation applicable.
          </p>

          <p>
            Pour toute question concernant le traitement de vos données
            personnelles, vous pouvez contacter JCI Madagascar.
          </p>
        </>
      ),
    },
    {
      number: "09",
      title: "Responsabilité",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            JCI Madagascar ne saurait être tenue responsable des dommages
            résultant d'une interruption du site, d'une défaillance technique,
            d'une utilisation inappropriée du site ou de tout événement
            indépendant de sa volonté.
          </p>

          <p>
            L'utilisateur demeure responsable de l'utilisation qu'il fait des
            informations et services accessibles depuis le site.
          </p>
        </>
      ),
    },
    {
      number: "10",
      title: "Modification des conditions",
      icon: FileText,
      content: (
        <p>
          JCI Madagascar se réserve le droit de modifier les présentes
          Conditions Générales d'Utilisation à tout moment afin de tenir compte
          des évolutions du site, de ses services ou du cadre réglementaire.
          Les nouvelles conditions prennent effet dès leur publication sur
          cette page.
        </p>
      ),
    },
    {
      number: "11",
      title: "Droit applicable",
      icon: FileText,
      content: (
        <p>
          Les présentes Conditions Générales d'Utilisation sont soumises au
          droit applicable à Madagascar. Tout différend relatif à l'utilisation
          du site sera traité conformément aux règles de compétence
          applicables.
        </p>
      ),
    },
    {
      number: "12",
      title: "Contact",
      icon: Mail,
      content: (
        <>
          <p>
            Pour toute question relative aux présentes conditions ou au
            fonctionnement du site, vous pouvez contacter JCI Madagascar par
            l'intermédiaire de ses canaux officiels.
          </p>

          <div className="mt-6 rounded-2xl bg-jci-black p-5 text-white">
            <p className="font-poppins text-sm font-semibold">
              JCI Madagascar
            </p>

            <p className="mt-2 font-poppins text-sm text-white/70">
              Organisation Nationale JCI Madagascar
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white text-jci-black">
      {/* HERO */}
      <section className="relative overflow-hidden bg-jci-black lg:pl-35 lg:mr-1 ml-0 pl-0">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-jci-blue/20" />
        <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full border-[25px] border-jci-yellow/20" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-20 lg:pt-28">
          <div className="max-w-4xl">
            {/* Small label */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-[3px] w-12 bg-jci-yellow" />

              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.22em] text-jci-yellow">
                Informations légales
              </span>
            </div>

            <h1 className="font-poppins text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-7xl">
              Conditions
              <br />
              <span className="text-jci-blue">Générales</span>
              <br />
              d'Utilisation
            </h1>

            <p className="mt-7 max-w-2xl font-poppins text-sm leading-7 text-white/65 sm:text-base">
              Les présentes conditions définissent les règles applicables à
              l'utilisation du site officiel de JCI Madagascar.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-jci-blue" />
              <div className="h-2 w-2 rounded-full bg-jci-yellow" />
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 lg:pl-60 lg:mr-1 ml-0 p5 ">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-jci-blue" />

              <span className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-jci-blue">
                CGU
              </span>
            </div>

            <h2 className="mt-5 font-poppins text-3xl font-bold leading-tight sm:text-4xl">
              Utilisation du
              <br />
              <span className="text-jci-blue">site JCI Madagascar</span>
            </h2>
          </div>

          {/* Right */}
          <div className="font-poppins text-sm leading-7 text-black/65 sm:text-base">
            <p>
              Bienvenue sur le site officiel de la Junior Chamber International
              Madagascar.
            </p>

            <p className="mt-5">
              En consultant et en utilisant ce site, vous reconnaissez avoir
              pris connaissance des présentes Conditions Générales
              d'Utilisation et acceptez de vous y conformer.
            </p>

            <div className="mt-8 border-l-4 border-jci-yellow bg-jci-yellow/10 px-5 py-4">
              <p className="text-sm font-semibold leading-6 text-jci-black">
                Dernière mise à jour : septembre 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#f7f8fa] lg:pl-50 lg:mr-1 ml-0 pl-0">
        <div className="mx-auto w-full px-5 py-14 sm:px-8 lg:py-20">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-jci-yellow" />

              <span className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-jci-black/50">
                Conditions
              </span>
            </div>

            <h2 className="mt-4 font-poppins text-2xl font-bold sm:text-3xl">
              Conditions d'utilisation du site
            </h2>
          </div>

          <div className="space-y-3">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isOpen = openSection === index;

              return (
                <article
                  key={section.number}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-jci-blue shadow-lg shadow-jci-blue/5"
                      : "border-black/5"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(index)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
                  >
                    {/* Number */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-poppins text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-jci-blue text-white"
                          : "bg-jci-black text-white"
                      }`}
                    >
                      {section.number}
                    </span>

                    {/* Icon */}
                    <Icon
                      size={18}
                      className={`hidden shrink-0 sm:block ${
                        isOpen ? "text-jci-blue" : "text-black/30"
                      }`}
                    />

                    {/* Title */}
                    <span className="flex-1 font-poppins text-sm font-semibold sm:text-base">
                      {section.title}
                    </span>

                    {/* Arrow */}
                    {isOpen ? (
                      <ChevronUp
                        size={20}
                        className="shrink-0 text-jci-blue"
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        className="shrink-0 text-black/40"
                      />
                    )}
                  </button>

                  {/* Content */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-black/5 px-5 pb-7 pt-6 sm:px-7 sm:pl-[6.75rem]">
                        <div className="font-poppins text-sm leading-7 text-black/65 sm:text-[15px]">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-jci-blue lg:pl-45 lg:mr-1 ml-0 pl-0">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                JCI Madagascar
              </p>

              <h2 className="mt-3 max-w-2xl font-poppins text-2xl font-bold text-white sm:text-3xl">
                Construire ensemble un avenir meilleur.
              </h2>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-jci-yellow text-jci-black">
              <ShieldCheck size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER LEGAL */}

    </main>
  );
};

export default CGUPage;