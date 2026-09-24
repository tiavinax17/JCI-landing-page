
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Database,
  Cookie,
  LockKeyhole,
  UserCheck,
  Mail,
} from "lucide-react";

const PolitiqueConfidentialitePage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      number: "01",
      title: "Introduction",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            JCI Madagascar accorde une importance particulière à la protection
            de la vie privée et des données personnelles des utilisateurs de
            son site internet.
          </p>

          <p>
            La présente Politique de Confidentialité explique quelles
            informations peuvent être collectées lorsque vous utilisez le
            site, pourquoi elles peuvent être utilisées et quelles mesures
            sont mises en œuvre pour contribuer à leur protection.
          </p>

          <p>
            Cette politique s'applique aux visiteurs et utilisateurs du site
            officiel de JCI Madagascar.
          </p>
        </>
      ),
    },

    {
      number: "02",
      title: "Données personnelles collectées",
      icon: Database,
      content: (
        <>
          <p>
            Selon les fonctionnalités que vous utilisez, certaines données
            personnelles peuvent être collectées lorsque vous choisissez de
            nous les communiquer.
          </p>

          <p className="font-semibold text-jci-black">
            Ces données peuvent notamment comprendre :
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Nom et prénom</li>
            <li>Adresse électronique</li>
            <li>Numéro de téléphone lorsque celui-ci est communiqué</li>
            <li>
              Informations contenues dans les messages envoyés via les
              formulaires du site
            </li>
            <li>
              Informations relatives à votre demande ou à votre participation
              à une activité
            </li>
          </ul>

          <p className="mt-5">
            Certaines informations techniques peuvent également être
            enregistrées automatiquement lors de la navigation, notamment des
            données relatives au navigateur, au périphérique ou à la
            consultation du site.
          </p>
        </>
      ),
    },

    {
      number: "03",
      title: "Utilisation des données",
      icon: UserCheck,
      content: (
        <>
          <p>
            Les données personnelles communiquées à JCI Madagascar peuvent
            être utilisées notamment afin de :
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Répondre aux demandes envoyées via le site</li>
            <li>Permettre le traitement des demandes d'information</li>
            <li>Gérer les échanges avec les utilisateurs</li>
            <li>
              Fournir les informations relatives aux activités et événements
              de JCI Madagascar
            </li>
            <li>Améliorer le fonctionnement et le contenu du site</li>
            <li>Préserver la sécurité et l'intégrité du site</li>
          </ul>

          <p className="mt-5">
            Les données sont utilisées dans la mesure nécessaire aux finalités
            pour lesquelles elles ont été communiquées ou collectées.
          </p>
        </>
      ),
    },

    {
      number: "04",
      title: "Données de navigation",
      icon: Database,
      content: (
        <>
          <p>
            Lors de votre navigation, certaines informations techniques peuvent
            être collectées automatiquement par le serveur ou les services
            utilisés pour assurer le fonctionnement du site.
          </p>

          <p className="mt-5">
            Ces informations peuvent notamment comprendre l'adresse IP, le
            type de navigateur, le système d'exploitation, les pages consultées
            ainsi que certaines informations relatives à la date et à la durée
            de la visite.
          </p>

          <p className="mt-5">
            Ces données peuvent être utilisées à des fins de sécurité, de
            diagnostic technique et d'amélioration du fonctionnement du site.
          </p>
        </>
      ),
    },

    {
      number: "05",
      title: "Cookies",
      icon: Cookie,
      content: (
        <>
          <p>
            Le site peut utiliser des cookies ou technologies similaires afin
            d'assurer certaines fonctionnalités techniques et d'améliorer
            l'expérience de navigation.
          </p>

          <p className="mt-5">
            Les cookies peuvent notamment permettre de conserver certaines
            préférences ou de faciliter le fonctionnement de certaines
            fonctionnalités du site.
          </p>

          <p className="mt-5">
            Vous pouvez configurer votre navigateur afin d'accepter, de
            refuser ou de supprimer les cookies. La désactivation de certains
            cookies peut toutefois affecter le fonctionnement de certaines
            fonctionnalités du site.
          </p>
        </>
      ),
    },

    {
      number: "06",
      title: "Partage des données",
      icon: UserCheck,
      content: (
        <>
          <p>
            JCI Madagascar ne vend pas les données personnelles des utilisateurs
            et ne les met pas à disposition à des fins commerciales étrangères
            aux finalités décrites dans la présente politique.
          </p>

          <p className="mt-5">
            Certaines données peuvent néanmoins être accessibles à des
            prestataires techniques lorsque cela est nécessaire au
            fonctionnement, à l'hébergement, à la maintenance ou à la
            sécurisation du site.
          </p>

          <p className="mt-5">
            Les données peuvent également être communiquées lorsqu'une
            obligation légale ou une demande émanant d'une autorité compétente
            l'exige.
          </p>
        </>
      ),
    },

    {
      number: "07",
      title: "Conservation des données",
      icon: Database,
      content: (
        <>
          <p>
            JCI Madagascar conserve les données personnelles uniquement pendant
            la durée nécessaire à la réalisation des finalités pour lesquelles
            elles ont été collectées, sous réserve des obligations légales
            applicables.
          </p>

          <p className="mt-5">
            La durée de conservation peut donc varier selon la nature de la
            donnée, la raison de sa collecte et les obligations applicables.
          </p>

          <p className="mt-5">
            Lorsque les données ne sont plus nécessaires, elles peuvent être
            supprimées ou anonymisées conformément aux procédures applicables.
          </p>
        </>
      ),
    },

    {
      number: "08",
      title: "Sécurité des données",
      icon: LockKeyhole,
      content: (
        <>
          <p>
            JCI Madagascar met en œuvre des mesures techniques et
            organisationnelles raisonnables destinées à protéger les données
            personnelles contre les accès non autorisés, la perte,
            l'altération, la divulgation ou la destruction.
          </p>

          <p className="mt-5">
            L'accès aux informations personnelles est limité aux personnes ou
            prestataires qui en ont besoin dans le cadre de leurs fonctions ou
            de leurs prestations.
          </p>

          <p className="mt-5">
            Malgré les mesures mises en place, aucune transmission ou
            conservation de données sur Internet ne peut être considérée comme
            totalement exempte de risque.
          </p>
        </>
      ),
    },

    {
      number: "09",
      title: "Vos droits",
      icon: UserCheck,
      content: (
        <>
          <p>
            Selon la réglementation applicable et sous réserve des conditions
            prévues par celle-ci, vous pouvez disposer de droits concernant
            vos données personnelles.
          </p>

          <p className="mt-5 font-semibold text-jci-black">
            Ces droits peuvent notamment comprendre :
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Le droit d'accéder aux données vous concernant</li>
            <li>Le droit de demander la rectification de données inexactes</li>
            <li>
              Le droit de demander la suppression de certaines données lorsque
              les conditions applicables sont réunies
            </li>
            <li>
              Le droit de vous opposer à certains traitements lorsque la
              réglementation le permet
            </li>
            <li>
              Le droit de retirer votre consentement lorsque le traitement
              repose sur celui-ci
            </li>
          </ul>

          <p className="mt-5">
            Toute demande relative à vos données personnelles peut être
            adressée à JCI Madagascar via ses coordonnées officielles.
          </p>
        </>
      ),
    },

    {
      number: "10",
      title: "Liens vers des sites tiers",
      icon: ShieldCheck,
      content: (
        <p>
          Le site de JCI Madagascar peut contenir des liens vers des sites,
          plateformes ou services appartenant à des tiers. Ces sites disposent
          de leurs propres politiques de confidentialité. JCI Madagascar
          recommande de consulter leurs politiques avant de leur communiquer
          des informations personnelles.
        </p>
      ),
    },

    {
      number: "11",
      title: "Modifications de la politique",
      icon: Database,
      content: (
        <p>
          JCI Madagascar peut modifier la présente Politique de Confidentialité
          afin de tenir compte de l'évolution du site, de ses pratiques, de ses
          services ou de la réglementation applicable.
          <br />
          <br />
          La version publiée sur cette page est la version applicable à compter
          de sa date de mise à jour.
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
            Pour toute question concernant cette Politique de Confidentialité,
            le traitement de vos données personnelles ou l'exercice de vos
            droits, vous pouvez contacter JCI Madagascar.
          </p>

          <div className="mt-6 rounded-2xl bg-jci-black p-6 text-white">
            <p className="font-poppins text-sm font-semibold">
              JCI Madagascar
            </p>

            <p className="mt-2 font-poppins text-sm text-white/65">
              Ambatonakanga, Madagascar
            </p>

            <a
              href="mailto:contact@jcimada.org"
              className="mt-3 inline-flex items-center gap-2 font-poppins text-sm text-jci-yellow transition-opacity hover:opacity-80"
            >
              <Mail size={16} />
              contact@jcimada.org
            </a>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white text-jci-black">
      {/* HERO */}
      <section className="relative overflow-hidden bg-jci-black lg:pl-35 lg:mr-1 ml-0 pl-0">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-jci-blue/20" />

        <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full border-[25px] border-jci-yellow/20" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-20 lg:pt-28">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-[3px] w-12 bg-jci-yellow" />

              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.22em] text-jci-yellow">
                Vie privée
              </span>
            </div>

            <h1 className="font-poppins text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-7xl">
              Politique de
              <br />
              <span className="text-jci-blue">Confidentialité</span>
            </h1>

            <p className="mt-7 max-w-2xl font-poppins text-sm leading-7 text-white/65 sm:text-base">
              Découvrez comment JCI Madagascar traite et protège les données
              personnelles susceptibles d'être collectées lors de votre
              utilisation du site.
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
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-jci-blue" />

              <span className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-jci-blue">
                Confidentialité
              </span>
            </div>

            <h2 className="mt-5 font-poppins text-3xl font-bold leading-tight sm:text-4xl">
              Vos données,
              <br />
              <span className="text-jci-blue">notre responsabilité</span>
            </h2>
          </div>

          <div className="font-poppins text-sm leading-7 text-black/65 sm:text-base">
            <p>
              La protection des données personnelles constitue un élément
              important dans l'utilisation du site officiel de JCI Madagascar.
            </p>

            <p className="mt-5">
              Cette politique vous permet de comprendre quelles informations
              peuvent être collectées, dans quelles circonstances elles sont
              utilisées et quelles mesures sont mises en place pour contribuer
              à leur protection.
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
                Protection des données
              </span>
            </div>

            <h2 className="mt-4 font-poppins text-2xl font-bold sm:text-3xl">
              Politique de confidentialité
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
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-poppins text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-jci-blue text-white"
                          : "bg-jci-black text-white"
                      }`}
                    >
                      {section.number}
                    </span>

                    <Icon
                      size={18}
                      className={`hidden shrink-0 sm:block ${
                        isOpen ? "text-jci-blue" : "text-black/30"
                      }`}
                    />

                    <span className="flex-1 font-poppins text-sm font-semibold sm:text-base">
                      {section.title}
                    </span>

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

      {/* BOTTOM */}
      <section className="bg-jci-blue lg:pl-45 lg:mr-1 ml-0 pl-0">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                JCI Madagascar
              </p>

              <h2 className="mt-3 max-w-2xl font-poppins text-2xl font-bold text-white sm:text-3xl">
                Votre vie privée mérite notre attention.
              </h2>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-jci-yellow text-jci-black">
              <LockKeyhole size={24} />
            </div>
          </div>
        </div>
      </section>


    </main>
  );
};

export default PolitiqueConfidentialitePage;

