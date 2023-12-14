'use client'
import { GuideTypes } from './types/common';
import ChipBar from './components/chipbar/ChipBar';
import { useGuidebarContext } from './contexts/GuidebarContextProvider';
import ImagePanel from './components/images/ImagePanel';

export default function Home() {
  const { guideLayout } = useGuidebarContext();
  return (
    <section className={`mt-14 smGb:max-lgGb:ml-guide-small ${guideLayout===GuideTypes.Regular? "lgGb:ml-guide-normal":"lgGb:ml-guide-small"} px-6`}>
      <ChipBar />
      <ImagePanel />
    </section>
  )
}