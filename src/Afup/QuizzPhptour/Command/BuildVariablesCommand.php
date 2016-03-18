<?php

namespace Afup\QuizzPhptour\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Goutte\Client;

class BuildVariablesCommand extends BaseCommand
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
            ->setName('build:variables')
            ->addArgument(
                'filename',
                InputArgument::REQUIRED
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

        $client = new Client();

        $crawler = $client->request('GET', 'http://event.afup.org/php-tour-2016/programme/');

        $speakers = array();
        $sessions = array();

        $crawler->filter('.sessions .session')->each(function ($node) use (&$speakers, &$sessions) {
                $speaker =  trim($node->filter('.conferencier')->first()->text());
                $session = $node->filter('h4')->first()->text() . "\n";
                $name = $node->filter('a[name]')->attr('name');
                $link = 'http://event.afup.org/php-tour-2016/programme/#' . $name;

                $speakers[] = $speaker;
                $sessions[] = array(
                    'text' => htmlentities($session),
                    'name' => $speaker,
                    'link' => $link,
                );
            });


        $this->getFilesystem()->dumpFile($filename, $this->twig->render('variables.js.twig', array(
            'speakers' => $speakers,
            'sessions' => $sessions,
        )));

        $this->getLogger()->warning(sprintf('File created', $filename), array('file' => $filename));
    }
}
