<?php

namespace Afup\QuizzPhptour\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class BuildIndexCommand extends BaseCommand
{
    /**
     * @var \Twig_Environment
     */
    protected $twig;

    /**
     * @param \Twig_Environment $twig
     * @param null $name
     */
    public function __construct(\Twig_Environment $twig, $name = null)
    {
        $this->twig = $twig;
        parent::__construct($name);
    }

    /**
     *
     */
    protected function configure()
    {
        $this
            ->setName('build:index')
            ->addArgument(
                'filename',
                InputArgument::REQUIRED
            )
            ->addOption(
                'prod',
                InputOption::VALUE_NONE
            )
        ;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $filename = $input->getArgument('filename');

        $this->getFilesystem()->dumpFile($filename, $this->twig->render('index.html.twig', array(
            'ga_enabled' => $input->getOption('prod'),
        )));

        $this->getLogger()->warning(sprintf('File created', $filename), array('file' => $filename));
    }
}
