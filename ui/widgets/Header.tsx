import React from "react";
import { useTranslation } from "next-i18next";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Container } from "@/ui/layout/Container";
import { Translations } from "@/data/locales";
import { RightPanel } from "@/ui/components/RightPanel";
import { HorizontalNav } from "@/ui/widgets/Nav/HorizontalNav";
import { VerticalNav } from "@/ui/widgets/Nav/VerticalNav";

export const Header = () => {
  const [panelOpen, setPanelOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <header>
      <RightPanel
        open={panelOpen}
        setOpen={setPanelOpen}
        clonePanelText={Translations.closeMainMenu}
      >
        <VerticalNav close={() => setPanelOpen(false)} />
      </RightPanel>

      <Container>
        <div className="flex h-16 short:h-12">
          <HorizontalNav />

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setPanelOpen(true)}
            >
              <span className="sr-only">{t(Translations.openMainMenu)}</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
